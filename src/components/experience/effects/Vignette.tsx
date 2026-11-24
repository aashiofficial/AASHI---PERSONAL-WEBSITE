import s from "@/styles/experience.module.css";

export default function Vignette({ className = "" }: { className?: string }) {
  return (
    <div
      className={`${s.vignette} ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
