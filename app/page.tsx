import { ThemeToggle } from "./_components/theme-toggle";
import { TodoList } from "./_components/todo-list";

export default function Home() {
	return (
		<div className="grid min-h-screen grid-rows-[auto_1fr_auto] items-center justify-items-center gap-8 p-8 pb-20 font-[family-name:var(--font-geist-mono)]">
			<header className="flex w-full justify-end p-4">
				<ThemeToggle />
			</header>

			<main className="grid w-full max-w-xl grid-cols-1 gap-8">
				<TodoList />
			</main>
			<footer className="text-center text-muted-foreground text-sm">
				Built with Convex and React Query
			</footer>
		</div>
	);
}
