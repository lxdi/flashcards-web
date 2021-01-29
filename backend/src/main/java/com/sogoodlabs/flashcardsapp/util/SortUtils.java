package com.sogoodlabs.flashcardsapp.util;

import com.sogoodlabs.flashcardsapp.model.entities.Task;

import java.util.List;

public class SortUtils {

    public static List<Task> sortTasks(List<Task> taskList) {
        taskList.sort((task1, task2) -> {
            if (task1.getPosition() > task2.getPosition()) {
                return 1;
            }
            if (task1.getPosition() < task2.getPosition()) {
                return -1;
            }
            return 0;
        });
        return taskList;
    }

}
