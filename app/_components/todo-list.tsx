"use client";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { type FormEvent, useRef } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

export function TodoList() {
	const inputRef = useRef<HTMLInputElement>(null);

	// Use TanStack Query with Convex
	const { data: tasks, isPending } = useQuery(
		convexQuery(api.tasks.getTasks, {}),
	);

	// Use Convex mutations with TanStack Query
	const addTaskMutation = useMutation({
		mutationFn: useConvexMutation(api.tasks.addTask),
	});

	const toggleTaskMutation = useMutation({
		mutationFn: useConvexMutation(api.tasks.toggleTask),
	});

	const deleteTaskMutation = useMutation({
		mutationFn: useConvexMutation(api.tasks.deleteTask),
	});

	// Handle form submission to add a new task
	const handleAddTask = async (e: FormEvent) => {
		e.preventDefault();

		const text = inputRef.current?.value.trim();
		if (!text) return;

		// Execute the mutation
		await addTaskMutation.mutateAsync({ text });

		// Clear input field
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	};

	// Handle toggling a task's completion status
	const handleToggleTask = async (taskId: Id<"tasks">) => {
		await toggleTaskMutation.mutateAsync({ taskId });
	};

	// Handle deleting a task
	const handleDeleteTask = async (taskId: Id<"tasks">) => {
		await deleteTaskMutation.mutateAsync({ taskId });
	};

	// Loading state
	if (isPending) {
		return <div className="py-4">Loading tasks...</div>;
	}

	return (
		<div className="mx-auto w-full max-w-md py-8">
			<h1 className="mb-6 font-bold text-2xl">Todo List (TanStack Query)</h1>

			<form onSubmit={handleAddTask} className="mb-6 flex gap-2">
				<Input ref={inputRef} placeholder="Add a new task" className="flex-1" />
				<Button type="submit" disabled={addTaskMutation.isPending}>
					Add
				</Button>
			</form>

			<ul className="space-y-2">
				{tasks?.map((task) => (
					<li
						key={task._id}
						className="flex items-center gap-3 rounded-md border bg-background/50 p-3"
					>
						<Checkbox
							checked={task.isCompleted}
							onCheckedChange={() => handleToggleTask(task._id)}
							className="h-5 w-5"
							disabled={toggleTaskMutation.isPending}
						/>
						<span
							className={`flex-1 ${
								task.isCompleted ? "text-muted-foreground line-through" : ""
							}`}
						>
							{task.text}
						</span>
						<Button
							onClick={() => handleDeleteTask(task._id)}
							variant="ghost"
							size="sm"
							className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
							disabled={deleteTaskMutation.isPending}
						>
							<Trash className="h-4 w-4" />
							<span className="sr-only">Delete</span>
						</Button>
					</li>
				))}
			</ul>

			{tasks?.length === 0 && (
				<p className="py-4 text-center text-muted-foreground">
					No tasks yet. Add one to get started!
				</p>
			)}
		</div>
	);
}
