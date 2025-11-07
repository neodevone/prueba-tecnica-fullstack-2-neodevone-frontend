import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white border-r p-4">
      <ul className="space-y-2">
        <li>
          <Link href="/admin/dashboard">
            Overview
          </Link>
        </li>
        <li>
          <Link href="/admin/courses">
            Courses
          </Link>
        </li>
        <li>
          <Link href="/admin/students">
            Students
          </Link>
        </li>
      </ul>
    </aside>
  );
}