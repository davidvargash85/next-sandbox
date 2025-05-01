import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Comment } from '@/types';

interface CommentListProps {
  items: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ items = [] }) => {
  const renderRow = ({ index, style }: ListChildComponentProps) => {
    const comment = items[index];
    return (
      <div style={style} key={index}>
        <ListItem alignItems="flex-start" sx={{ flexDirection: 'column' }}>
          <ListItemText
            primary={comment.name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.primary', display: 'inline' }}
                >
                  {comment.body}
                </Typography>
              </React.Fragment>
            }
          />
          <ListItemText secondary={comment.email} />
        </ListItem>
        {index < items.length - 1 && <Divider variant="inset" component="li" />}
      </div>
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 400,
        bgcolor: 'background.paper', // Applying bgcolor here
        borderRadius: 1, // Optional: Add border radius for better look
        boxShadow: 3, // Optional: Add shadow for better UI
      }}
    >
      <FixedSizeList
        height={400} // Height of the virtualized list
        itemSize={120} // Height of each item in the list (adjust based on your layout)
        itemCount={items.length} // Total number of items in the list
        overscanCount={5} // Number of items to render above and below the visible area
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
};

export default CommentList;
