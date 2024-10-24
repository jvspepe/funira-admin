type Props = {
  title: string;
};

const PageHeader = ({ title }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <h1 className="text-[32px]">{title}</h1>
    </div>
  );
};

export default PageHeader;
