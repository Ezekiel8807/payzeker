type BankInfoProbs = {
  BankInfo: {
    firstname: string;
    lastname: string;
    bankName: string;
    bankAcctNo: number;
  };
};

export default function BankInfo({ BankInfo }: BankInfoProbs) {
  const { firstname, lastname, bankName, bankAcctNo } = BankInfo;
  const acctName = `${lastname} ${firstname}`;
  return (
    <div className="w-[280px] h-[130px] md:w-[300px] bg-[var(--green)] p-3 shadow-md rounded-lg">
      <p className="font-black text-[14px] text-[var(--white)]">
        Withdral Card
      </p>
      <h2 className="text-[12px] mt-1">{bankName.toUpperCase()}</h2>
      <h2 className="my-2 text-xl text-[var(--white)] tracking-[16px] md:tracking-[18px]">
        {bankAcctNo}
      </h2>
      <p className="font-black tracking-[3px] text-[12px]">
        {acctName.toUpperCase()}
      </p>
    </div>
  );
}
