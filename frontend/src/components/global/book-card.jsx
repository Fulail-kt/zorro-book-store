import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const BookCard = ({book}) => {
  return (
    <>
    <Link href={`/store/${book._id}`}>
      <Card className="h-full flex flex-col transition-transform duration-300 hover:scale-105">
        <CardMedia
          component="img"
          height="300"
          image={book.image}
          alt={book.title}
          className="h-44 object-cover"
        />
        <CardContent className="flex-grow">
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className="font-semibold"
          >
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.author}
          </Typography>
        </CardContent>
      </Card>
    </Link>
    </>
  );
};

export default BookCard;
