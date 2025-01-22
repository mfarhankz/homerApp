import { Card } from "flowbite-react";
import React from "react";

const CardBox = ({ children, className }) => {
    return (
        <Card
            className={`card shadow-none ${className}`}
            theme={{
                root: {
                    base: "flex rounded-lg flex-col",
                    children: "flex h-full flex-col justify-center p-0" // Added p-0 here
                }
            }}
        >
            {children}
        </Card>
    );
};

export default CardBox;