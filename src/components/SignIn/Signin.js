import React from "react";
import { TextField, Box, FormControl, FormGroup, Input } from "@mui/material";

const Signin = () => {
    return (
        <div className="center">
            <Box sx={{ display: 'flex' }}>
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormGroup>
                        <Input defaultValue="Hello world"  />
                    </FormGroup>
                </FormControl>
            </Box>
        </div>
    );
}

export default Signin;