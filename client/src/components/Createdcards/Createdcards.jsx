import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import styles from "./Createdcards.module.css";
import { Link } from "react-router-dom";
export default function RecipeReviewCard({ post }) {
  const folder = `https://lh3.googleusercontent.com/d/`;

  const [expanded, setExpanded] = React.useState(false);

  const imageCollection = [
    "/Hiring/one.jpg",
    "/Hiring/two.jpg",
    "/Hiring/three.jpg",
    "/Hiring/four.png",
    "/Hiring/five.jpg",
    "/Hiring/six.jpg",
    "/Hiring/seven.jpg",
    "/Hiring/eight.jpg",
    "/Hiring/nine.jpg",
    "/Hiring/ten.jpg",
  ];

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.jobCard}>
      <Card sx={{ maxWidth: 400, minHeight: 500, maxHeight: 500 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: "white", height: 60, width: 60 }}
              aria-label="recipe"
            >
              <img src="data:image/png;base64,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" />
            </Avatar>
          }
          titleTypographyProps={{ variant: "h6", fontSize: "18px" }}
          title={post ? post.title : null}
          subheader={formatDate(post?.createdAt)}
        />
        <CardMedia
          component="img"
          height="250"
          image={imageCollection[randomIntFromInterval(0, 9)]}
          referrerPolicy="no-referrer"
          alt="Paella dish"
        />
        <div className={styles["flexContent"]}>
          <CardContent>
            <div className={styles["descCard"]}>
              <Typography variant="body2" color="text.secondary">
                {post ? post.desc : null}
              </Typography>
            </div>
          </CardContent>
          <CardActions disableSpacing>
            <div style={{ marginBottom: "0" }}>
              <Stack spacing={3} direction="row">
                <Link to={post ? `/jobdash/${post?._id}` : "/"}>
                  <Button variant="contained">View Dashboard</Button>
                </Link>
                <Link to={post ? `/ranking/${post?._id}` : "/"}>
                  <Button variant="outlined">Ranked Resumes</Button>
                </Link>
              </Stack>
            </div>
          </CardActions>
        </div>
      </Card>
    </div>
  );
}
