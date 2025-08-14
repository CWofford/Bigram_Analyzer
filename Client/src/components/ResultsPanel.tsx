import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { AnalyzeResult, formatPercentage } from './utils/helpers.ts';
import '../App.css';

interface ResultsPanelProps {
    results: AnalyzeResult;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<any>(null);

    useEffect(() => {
        if (!canvasRef.current || !results.bigrams) return;

        if (chartRef.current) chartRef.current.destroy();

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        chartRef.current = new ChartJS(ctx, {
            type: 'bar',
            data: {
                labels: results.bigrams.map((b) => b.pair.join(' ')),
                datasets: [{
                    label: 'Frequency',
                    data: results.bigrams.map((b) => b.frequency),
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { title: { display: true, text: 'Bigram Frequency Distribution' }, legend: { display: false } },
                scales: { y: { beginAtZero: true } },
            },
        });

        return () => { if (chartRef.current) chartRef.current.destroy(); };
    }, [results.bigrams]);

    return (
        <>
            <StatsPanel
                totalWords={results.statistics?.total_words}
                totalBigrams={results.statistics?.total_bigrams ?? results.bigrams?.length}
                uniqueBigrams={results.statistics?.unique_bigrams ?? results.bigrams?.length}
            />
            <h3>Bigram Histogram</h3>
            <div className="chart-container">
                <canvas ref={canvasRef} width={800} height={400} />
            </div>
            <h3>Detailed Results</h3>
            <BigramTable bigrams={results.bigrams ?? []} />
        </>
    );
};

const StatsPanel: React.FC<{ totalWords?: number; totalBigrams?: number; uniqueBigrams?: number }> = ({ totalWords, totalBigrams, uniqueBigrams }) => (
    <div className="stats-panel">
        <h3>Statistics</h3>
        <p>Total Words: {totalWords ?? 'N/A'}</p>
        <p>Total Bigrams: {totalBigrams ?? 'N/A'}</p>
        <p>Unique Bigrams: {uniqueBigrams ?? 'N/A'}</p>
        <p hidden={totalWords ? totalWords >= 2 : true}>You Have no Bigrams please enter at least two words for Bigram Analysis</p>
    </div>
);

const BigramTable: React.FC<{ bigrams: { pair: string[]; frequency: number; percentage?: number }[] }> = ({ bigrams }) => (
    <table className="bigram-table">
        <thead>
            <tr>
                <th>Rank</th>
                <th>Bigram</th>
                <th>Frequency</th>
                <th>Percentage</th>
            </tr>
        </thead>
        <tbody>
            {bigrams.map((b, i) => (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>&quot;{b.pair.join(' ')}&quot;</td>
                    <td>{b.frequency}</td>
                    <td>{formatPercentage(b.percentage)}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default ResultsPanel;