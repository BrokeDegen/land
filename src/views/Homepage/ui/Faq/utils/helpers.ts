export const handleClick = (
  id: number,
  setOpenId: React.Dispatch<React.SetStateAction<number | null>>,
  openId: number | null,
) => {
  setOpenId(openId === id ? null : id);
};
