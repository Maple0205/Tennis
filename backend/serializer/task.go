package serializer

import "tennis/model"

type Task struct {
	ID      uint   `json:"id" example:"1"`
	Title   string `json:"title"`
	Content string `json:"content"`
	//View uint64 `json:"view"`
	Status    int   `json:"status"`
	CreatedAt int64 `json:"created_at"`
	StartTime int64 `json:"start_time"`
	EndTime   int64 `json:"end_time"`
}

func BuildTask(item model.Task) Task {
	return Task{
		ID:      item.ID,
		Title:   item.Title,
		Content: item.Content,
		//View: item.View(),
		Status:    item.Status,
		CreatedAt: item.CreatedAt.Unix(),
		StartTime: item.StartTime,
		EndTime:   item.EndTime,
	}
}

func BuildTasks(items []model.Task) (tasks []Task) {
	for _, item := range items {
		task := BuildTask(item)
		tasks = append(tasks, task)
	}
	return tasks
}
