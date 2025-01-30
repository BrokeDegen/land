export const FaqItemBorder = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`absolute inset-0 z-0 rounded-[21px] bg-gradient-to-r from-[#ca3639] via-transparent to-transparent transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};
