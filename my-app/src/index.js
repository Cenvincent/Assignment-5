// index.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const CurrencyRates = () => {
    const [rates, setRates] = useState([]); // State untuk nilai tukar mata uang
    const apiKey = '72c6848bfabc469c945faec3e3ce203d'; // API key Anda

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&base=USD`
                );
                const exchangeRates = response.data.rates;

                // Filter dan map mata uang yang diinginkan
                const currencyData = ['CAD', 'EUR', 'IDR', 'JPY', 'CHF', 'GBP'].map(currency => ({
                    currency,
                    exchangeRate: parseFloat(exchangeRates[currency]),
                    weBuy: parseFloat(exchangeRates[currency]) * 1.05,
                    weSell: parseFloat(exchangeRates[currency]) * 0.95,
                }));

                setRates(currencyData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [apiKey]);

    return (
        <div className="currency-container">
            <table>
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>We Buy</th>
                        <th>Exchange Rate</th>
                        <th>We Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {rates.map((rate) => (
                        <tr key={rate.currency}>
                            <td>{rate.currency}</td>
                            <td>{rate.weBuy.toFixed(5)}</td>
                            <td>{rate.exchangeRate.toFixed(4)}</td>
                            <td>{rate.weSell.toFixed(5)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="note">
                Nilai tukar berdasarkan 1 USD.<br />
                Aplikasi ini menggunakan API dari https://currencyfreaks.com.
            </p>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CurrencyRates />);
