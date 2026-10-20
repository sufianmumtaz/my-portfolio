import {
  ArrowDown,
  ArrowRight,
  Bot,
  Brain,
  ChartLine,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Cloud,
  CodeXml,
  Database,
  ExternalLink,
  FileText,
  FolderOpen,
  GraduationCap,
  House,
  Layers,
  LoaderCircle,
  Mail,
  Phone,
  Rocket,
  Route,
  Send,
  Server,
  Share2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  User,
  Workflow,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import type { IconName } from "../data";

// Lucide no longer ships brand marks, so LinkedIn is drawn inline.
function Linkedin({ size = 24, strokeWidth = 2, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const icons: Record<IconName, ComponentType<LucideProps>> = {
  home: House,
  user: User,
  hub: Share2,
  folder: FolderOpen,
  mail: Mail,
  clock: Clock,
  arrowDown: ArrowDown,
  arrowRight: ArrowRight,
  external: ExternalLink,
  route: Route,
  shield: ShieldCheck,
  brain: Brain,
  rocket: Rocket,
  tree: Workflow,
  layers: Layers,
  stats: ChartLine,
  bot: Bot,
  timeline: TrendingUp,
  graduation: GraduationCap,
  code: CodeXml,
  server: Server,
  database: Database,
  cloud: Cloud,
  linkedin: Linkedin,
  phone: Phone,
  file: FileText,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  check: Check,
  spinner: LoaderCircle,
  send: Send,
  sparkles: Sparkles,
};

export default function Icon({ name, ...props }: LucideProps & { name: IconName }) {
  const Component = icons[name] ?? Sparkles;
  return <Component aria-hidden="true" {...props} />;
}
