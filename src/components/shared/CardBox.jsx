import { Card } from "flowbite-react";
import React from "react";

const CardBox = ({ children, className }) => {
    return (
        <Card
            className={`card shadow-none ${className}`}
            theme={{
                root: {
                    base: "flex rounded-lg flex-col",
                    children: "" // Added p-0 here
                }
            }}
        >
            {children}
        </Card>
    );
};

export default CardBox;