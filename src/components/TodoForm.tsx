import React, { VFC } from "react";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: any) => void;
};

export const TodoForm: VFC<Props> = (props) => {
  const { value, onChange, onSubmit } = props;
  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange} />
        <input type="submit" value="追加" onSubmit={onSubmit} />
      </form>
    </>
  );
};
