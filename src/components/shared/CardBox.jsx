import { Card } from "flowbite-react";
import React from "react";

const CardBox = ({ children, className }) => {
    return (
        <Card
            className={`card shadow-none ${className}`}
            theme={{
                root: {
                    base: "flex rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 flex-col",
                    children: "flex h-full flex-col justify-center p-0" // Added p-0 here
                }
            }}
        >
            {children}
        </Card>
    );
};

export default CardBox;