import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Radio, HStack, Box } from "@chakra-ui/react";

export default function StarRating({ rating, count }) {
  return (
    <HStack spacing={"2px"}>
      {[...Array(count || 5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <Box
            as="label"
            key={index}
            color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
          >
            <Radio name="rating" value={ratingValue} display={"none"}></Radio>
            <FaStar size={12} />
          </Box>
        );
      })}
    </HStack>
  );
}
