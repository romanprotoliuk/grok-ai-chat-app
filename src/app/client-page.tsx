'use client';

import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import Chat from "@/components/ui/chat";
import { useChatContext } from "@/context/chat-context";
import LoadingSkeleton from '@/components/ui/loading-skeleton';
import Logo from "@/components/ui/logo";
import ChatList from "@/components/ui/chat-list";
import NewChatButton from "@/components/ui/new-chat-button";
import UserProfile from "@/components/ui/user-profile";
import SignInPrompt from "@/components/ui/sign-in-prompt";
import { ChatContextType } from "@/types";

export default function ClientPage() {
  const { data: session, status } = useSession();
  const { 
    chats, 
    activeChat, 
    setActiveChat, 
    createNewChat, 
    deleteChat,
  } = useChatContext() as ChatContextType;

  if (status === 'loading') {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <div className="global-container">
        <div className="left-container">
          <Logo />
          {session ? (
            <>
              <NewChatButton createNewChat={createNewChat} />
              <ChatList
                chats={chats}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
                deleteChat={deleteChat}
              />
              <UserProfile user={session.user} onSignOut={() => signOut()} />
            </>
          ) : (
            <SignInPrompt onSignIn={() => signIn("twitter")} />
          )}
        </div>
        <Chat />
      </div>
    </>
  );
}