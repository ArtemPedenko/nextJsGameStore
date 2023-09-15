"use client";
import { FC } from "react";



interface epicProps {
    data: any;
}


const Fetching: FC<epicProps> = ({ data }) => {

    console.log(data);
    return (
        <section>this is home home page</section>
    )
}

export default Fetching;