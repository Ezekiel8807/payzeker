type BankInfoProbs = {
  BankInfo: {
    firstname: string;
    lastname: string;
    bankName: string;
    bankAcctNo: string;
  };
};

export default function BankInfo({ BankInfo }: BankInfoProbs) {
  const { firstname, lastname, bankName, bankAcctNo } = BankInfo;
  const acctName = `${lastname} ${firstname}`;
  return (
    <div className="w-full h-full bg-[var(--green)] p-3 shadow-card rounded-card">
      <p className="font-black text-sm text-[var(--white)]">
        Withdral Card
      </p>
      <h2 className="text-xs mt-1 text-white/90">{bankName.toUpperCase()}</h2>
      <h2 className="my-2 text-xl text-[var(--white)] tracking-[16px] md:tracking-[18px]">
        {bankAcctNo}
      </h2>
      <p className="font-black tracking-[3px] text-xs text-white/90">
        {acctName.toUpperCase()}
      </p>
    </div>
  );
}
