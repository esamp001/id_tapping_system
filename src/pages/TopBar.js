import React from 'react'
import { Box, Typography, }

const TopBar = () => {
        const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000); // update every second

        return () => clearInterval(timer); // cleanup on unmount
    }, []);
    
  return (
    <>
          {/* Top section */}
          <Box
              sx={{
                  display: 'flex',
                  flex: { xs: '1 1 100%', sm: '1 1 48%' },
                  minWidth: 200,
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 3,
              }}
          >
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Digital Attendance Tracker
              </Typography>

              <Typography
                  variant="subtitle2"
                  sx={{
                      fontFamily: "'Roboto Mono', monospace",
                      fontWeight: 500,
                      fontSize: '0.875rem',
                  }}
              >
                  {formatTime(time)}
              </Typography>
          </Box>
    </>
  )
}

export default TopBar