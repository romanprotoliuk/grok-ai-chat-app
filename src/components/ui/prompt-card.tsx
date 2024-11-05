type Prompt = {
  title: string;
  description: string;
  promptMessage: string;
}

interface PromptCardProps {
  prompt: Prompt;
  onClick: (prompt: string) => void;
}

export default function PromptCard({ prompt, onClick }: PromptCardProps) {
  return (
    <div
      onClick={() => onClick(prompt.promptMessage)}
      className="cursor-pointer border rounded-lg p-4 hover:shadow-md transition-all
        bg-white hover:bg-gray-50"
    >
      <h3 className="text-lg font-semibold text-center mb-2">{prompt.title}</h3>
      <p className="text-sm text-center text-gray-500">{prompt.description}</p>
    </div>
  );
}