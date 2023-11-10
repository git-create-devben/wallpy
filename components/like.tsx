import {
  ClickVoteComponent,
  ClickVoteProvider,
  LikeStyle,
} from "@clickvote/react";

function Like() {
  return (
    <div className="w-[200px] bg-white">
      <ClickVoteProvider
        value={{
          apiUrl: "socket.clickvote.dev",
          publicKey: "pb_QFHQfHcuQxOvLJNaOjjOeFo9wOrZbTN7",
          userId: "visitor",
        }}
      >
        <ClickVoteComponent id="wallpy" voteTo="VOTE_TO">
          {(props) => <LikeStyle {...props} />}
        </ClickVoteComponent>
      </ClickVoteProvider>
    </div>
  );
}

export default Like;
