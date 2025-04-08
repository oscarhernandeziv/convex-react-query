import { v } from "convex/values";
import { query } from "./_generated/server";
import { mutation } from "./_generated/server";

export const getTasks = query({
	args: {},
	returns: v.array(
		v.object({
			text: v.string(),
			isCompleted: v.boolean(),
			_id: v.id("tasks"),
			_creationTime: v.number(),
		}),
	),
	handler: async (ctx) => {
		return await ctx.db.query("tasks").order("desc").collect();
	},
});

export const addTask = mutation({
	args: { text: v.string() },
	returns: v.id("tasks"),
	handler: async (ctx, args) => {
		const taskId = await ctx.db.insert("tasks", {
			text: args.text,
			isCompleted: false,
		});
		return taskId;
	},
});

export const toggleTask = mutation({
	args: { taskId: v.id("tasks") },
	returns: v.id("tasks"),
	handler: async (ctx, args) => {
		const task = await ctx.db.get(args.taskId);
		if (task) {
			await ctx.db.patch(args.taskId, {
				isCompleted: !task.isCompleted,
			});
		} else {
			console.warn(`Task with id ${args.taskId} not found for toggling.`);
		}
		return args.taskId;
	},
});

export const deleteTask = mutation({
	args: { taskId: v.id("tasks") },
	returns: v.id("tasks"),
	handler: async (ctx, args) => {
		const { taskId } = args;
		await ctx.db.delete(taskId);
		return taskId;
	},
});
