import FlowBuilder from "@/components/FlowBuilder";
import { SignedOut, SignInButton, SignedIn } from "@clerk/nextjs";

export default function FlowBuilderPage() {
  return (
    <div className="h-[80vh]">
      <SignedOut>
        <SignInButton>Sign in to create a flow</SignInButton>
      </SignedOut>
      <SignedIn>
        <FlowBuilder />
      </SignedIn>
    </div>
  );
}
