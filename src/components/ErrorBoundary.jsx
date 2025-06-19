import React from 'react';
import { Box, Typography, Button } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Sacred Geometry App Error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          bgcolor="black"
          color="white"
          p={3}
        >
          <Typography variant="h4" gutterBottom>
            Something went wrong with the sacred geometry
          </Typography>
          <Typography variant="body1" gutterBottom color="grey.400">
            The cosmic patterns have encountered an error
          </Typography>
          <Button 
            variant="outlined" 
            onClick={this.handleReset}
            sx={{ mt: 2, color: 'lightblue', borderColor: 'lightblue' }}
          >
            Restore Harmony
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;