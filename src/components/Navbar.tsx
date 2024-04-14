import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Box sx={{flexGrow: 1}}>
                    <Image
                        alt="logo"
                        src="/logo/andersen.webp"
                        width={120}
                        height={47}
                        
                    />
                    </Box>

                    <Button
                        onClick={() => {
                            signOut();
                        }}
                    >
                        Sign out
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
