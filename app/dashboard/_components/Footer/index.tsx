import { HeartIcon } from "@heroicons/react/24/solid";

interface FooterProps {
  brandName?: string;
  brandLink?: string;
  routes?: Array<{ name: string; path: string }>;
}

export function Footer({
  brandName = "Dotech Digital",
  brandLink = "https://google.com",
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit dark:text-gray-100">
          &copy; {year}, made with{" "}
          <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-600" />{" "}
          by{" "}
          <a
            href={brandLink}
            target="_blank"
            className="transition-colors hover:text-blue-500 font-bold"
          >
            {brandName}
          </a>{" "}
          for a better web.
        </p>
      </div>
    </footer>
  );
}
