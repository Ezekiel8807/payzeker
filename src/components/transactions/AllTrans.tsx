//components
import Table from "../Table";
import Search from "../Search";
import TransCard from "../cards/TransCard";

export default function AllTrans() {
  return (
    <div>
      <div className="w-[100%]">
        <Search />
        <Table>
          <TransCard />
          <TransCard />
          <TransCard />
          <TransCard />
        </Table>
      </div>
    </div>
  );
}
