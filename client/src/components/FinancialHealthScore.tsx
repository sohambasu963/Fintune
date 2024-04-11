"use client";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Plugin, Tooltip } from 'chart.js'

Chart.register(ArcElement, Tooltip);

interface DoughnutChartProps {
    score: number;
}

const centerTextPlugin = (score: number): Plugin => ({
    id: 'centerText',
    beforeDatasetsDraw: (chart) => {
      const { ctx } = chart;
      ctx.save();
      const xPos = chart.getDatasetMeta(0).data[0].x;
      const yPos = chart.getDatasetMeta(0).data[0].y;
      ctx.font = 'bold 28px sans-serif';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.fillText(`${score}`, xPos, yPos);
      ctx.restore();
    },
  });
  

function DoughnutChart({ score }: DoughnutChartProps) {
    const remainingScore = 900 - score;

    const data = {
        labels: ['Score', 'Remaining'],
        datasets: [
          {
            data: [score, remainingScore],
            backgroundColor: ['#4caf50', '#e0e0e0'],
            borderColor: ['#ffffff', '#ffffff'],
            borderWidth: 1,
          },
        ],
        centerText: `${score}`,
      };
    
      const options = {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            filter: (tooltipItem: any) => {
                return tooltipItem.label !== 'Remaining';
            },
            callbacks: {
              label: function(context: any) {
                let label = context.label || '';
      
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label += context.parsed;
                }
                return label;
              }
            }
          }
        },
        maintainAspectRatio: false,
      };

      Chart.register(centerTextPlugin(score));
    
      return <Doughnut data={data} options={options} />;
}


export default function FinancialHealthScore({ score }: DoughnutChartProps) {
    return (
        <Card>
            <CardHeader>
            <CardTitle>Financial Health Score</CardTitle>
            <CardDescription>How you're doing financially (like a credit score)</CardDescription>
            </CardHeader>
            <CardContent>
            <div style={{ width: '400px', height: '400px' }}>
                <DoughnutChart score={score} />
            </div>
            </CardContent>
        </Card>
    );
}