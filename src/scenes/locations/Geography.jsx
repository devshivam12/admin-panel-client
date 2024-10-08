import React from 'react'
import Header from '../../components/Header'
import { useGetLocationsQuery } from '../../state/api'
import { ResponsiveChoropleth } from '@nivo/geo'
import { geoData } from '../../state/geoData'
import { Box, useTheme } from '@mui/material'

const Geography = () => {
  const { data, isLoading } = useGetLocationsQuery()
  console.log(data)
  const theme = useTheme()

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="GEOGRAPHY" subtitle="Find where your users are located." />

      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
      >
        {data?.formattedLocations || !isLoading ? (
          <ResponsiveChoropleth
            data={data?.formattedLocations}
            theme={{
              background: theme.palette.background.default,
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[700],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[100],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[700],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[100],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[100],
                },
              },
              tooltip: {
                container: {
                  background: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                },
              },
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor="#333333"  // Darker unknown regions
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor="#444444"  // Darker border color
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : <>Loading...</>}
      </Box>
    </Box>
  )
}

export default Geography
