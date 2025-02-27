import { useBearStore } from "../main"

export default function Page1(){
    return <div>Page1<BearCounter/></div>
}

function BearCounter() {
    const bears = useBearStore((state: any) => state.bears)
    return <h1>{bears} around here ...</h1>
  }