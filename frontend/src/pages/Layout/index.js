import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../../images/icons8-tennis-96.png'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import CreateClient from '../../components/CreateClient';
import ClientList from '../../components/ClientList';
import CheckAttendance from '../../components/CheckAttendance';
import ClassType from '../../components/ClassType';
import Media from 'react-media';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Analysis', '1', <PieChartOutlined />),
  getItem('Class', '2', <DesktopOutlined />, [getItem('Check Attendance', '21'), getItem('Class Type', '22')]),
  getItem('Client', '3', <UserOutlined />, [getItem('New Client', '31'), getItem('Client List', '32')]),
  getItem('Booking', '4', <FileOutlined />),
  getItem('Log Out', '5', <LogoutOutlined />),
];
const TennisLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [selectedMenuItemKey, setSelectedMenuItemKey] = useState("1"); // 初始选中项
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuSelect = ({ key }) => {
    setSelectedMenuItemKey(key);
  };
  const bread=(selectedMenuItemKey)=>{
    if(parseInt(selectedMenuItemKey)<10)
        return <Breadcrumb.Item>{items[selectedMenuItemKey-1].label}</Breadcrumb.Item>
    else{
      return <><Breadcrumb.Item>{items[parseInt(selectedMenuItemKey/10)-1].label}</Breadcrumb.Item>
      <Breadcrumb.Item>{items[parseInt(selectedMenuItemKey/10)-1].children[selectedMenuItemKey%10-1].label}</Breadcrumb.Item></>
    }
  }

  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Media query="(min-width: 501px)">
        {(matches) => (matches ? ( 
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} selectedKeys={[selectedMenuItemKey]} mode="inline" items={items} onSelect={handleMenuSelect}/>
        </Sider>) : (
          <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} selectedKeys={[selectedMenuItemKey]} mode="inline" items={items} onSelect={handleMenuSelect}/>
        </Sider>))}
      </Media>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={logo}
          alt="logo"
          style={{
            width: '35px',
            height: '35px',
            marginRight: '10px',
            marginLeft: '30px',
            animation: 'rotate 2s linear infinite', // 应用旋转动画
          }}
        />
        <h2 style={{ margin: '0', color:'#3D9970' }}>Tennis Class Notebook</h2>
      </div>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            {bread(selectedMenuItemKey)}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {selectedMenuItemKey==="31" && <CreateClient/>}
            {selectedMenuItemKey==="32" && <ClientList/>}
            {selectedMenuItemKey==="21" && <CheckAttendance/>}
            {selectedMenuItemKey==="5" && handleLogOut()}
            {selectedMenuItemKey==="22" && <ClassType/>}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Tennis Design ©2023 Created by Maple
        </Footer>
      </Layout>
    </Layout>
  );
};
export default TennisLayout;