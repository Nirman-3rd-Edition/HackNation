import React, { useState, useEffect, useCallback } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import 'bootstrap/dist/css/bootstrap.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Weather.css';
import cloudy2 from '../Pages/images/cloudy2.jpg';
import rainy3 from '../Pages/images/rainy3.jpg';
import sunny1 from '../Pages/images/sunny1.jpg';
import thunderstorm4 from '../Pages/images/thunderstorm4.jpg';
import snowy5 from '../Pages/images/snowy5.jpg';
import foggy6 from '../Pages/images/foggy6.jpg';

const API_KEY = '88939f44c6bda2a77f49d29e14f2e8b8';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export default function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);
    const [hourlyForecast, setHourlyForecast] = useState(null);
    const [dailyForecast, setDailyForecast] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);

    const getCurrentPosition = useCallback(() => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }, []);

    const reverseGeocode = useCallback(async (latitude, longitude) => {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await response.json();
        return data.city;
    }, []);

    const calculatePrecipitation = useCallback((weatherId) => {
        if ((weatherId >= 200 && weatherId < 300) || (weatherId >= 300 && weatherId < 400) || (weatherId >= 500 && weatherId < 600) || (weatherId >= 600 && weatherId < 700)) {
            return '10 mm';
        } else {
            return '0 mm';
        }
    }, []);

    const getBackgroundImage = useCallback((weatherIcon) => {
        // Background image switch cases
        switch (weatherIcon) {
            case '01d':
                return `url(${sunny1})`;
            case '01n':
                return `url(${sunny1})`;
            case '02d':
                return `url(${cloudy2})`;
            case '03d':
                return `url(${cloudy2})`;
            case '04d':
                return `url(${cloudy2})`;
            case '02n':
                return `url(${cloudy2})`;
            case '03n':
                return `url(${cloudy2})`;
            case '04n':
                return `url(${cloudy2})`;
            case '09d':
                return `url(${rainy3})`;
            case '09n':
                return `url(${rainy3})`;
            case '10d': 
                return `url(${rainy3})`; 
            case '10n': 
                return `url(${rainy3})`;
            case '11d':
                return `url(${thunderstorm4})`;
            case '11n':
                return `url(${thunderstorm4})`;
            case '13d':
                return `url(${snowy5})`;
            case '50d':
                return `url(${foggy6})`;
            case '13n':
                return `url(${snowy5})`;
            case '50n':
                return `url(${foggy6})`;
            default:
                return 'url("https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
        }
    }, []);
    

    const fetchWeatherDataByCity = useCallback(async (cityName) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setWeatherData({
                temperature: data.list[0].main.temp,
                feelsLike: data.list[0].main.feels_like,
                humidity: data.list[0].main.humidity,
                precipitation: calculatePrecipitation(data.list[0].weather[0].id),
                windSpeed: data.list[0].wind.speed,
                weatherIcon: `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`,
                weatherDescription: data.list[0].weather[0].description
            });
            setHourlyForecast(data.list.slice(0, 8));
            setDailyForecast(data.list.filter((item, index) => index % 8 === 0).slice(0, 7));
            setError(null);
            setBackgroundImage(getBackgroundImage(data.list[0].weather[0].icon));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [calculatePrecipitation, getBackgroundImage]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const position = await getCurrentPosition();
                const { latitude, longitude } = position.coords;
                const cityName = await reverseGeocode(latitude, longitude);
                setCity(cityName);
                fetchWeatherDataByCity(cityName);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchWeatherData();
    }, [getCurrentPosition, reverseGeocode, fetchWeatherDataByCity]);

    const formatHour = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return `${date.getHours()}:00`;
    };

    const formatDay = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <>
            <Header />
            <div className="weather-background" style={{ backgroundImage: backgroundImage }}>
                <h1 className='text-center'>Today's Weather</h1>
                <Container className="mt-4" style={{ marginBottom: '50px' }}>
                    {/* Search form */}
                    <Form className="d-flex">
                        <Form.Control
                            type="text"
                            placeholder="Enter city name"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            style={{ width: '200px', marginRight: '10px' }}
                        />
                        <Button onClick={() => {
                            fetchWeatherDataByCity(city);
                            setSearched(true);
                        }}>Search</Button>
                    </Form>
                </Container>
                {searched && (
                    <Container className="mt-4 p-3">
                        {/* Display weather forecast */}
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : weatherData && (
                            <>
                                <h2>Weather in {city}</h2> {/* Show the city name here */}
                                <Row>
                                    <Col>
                                        <Card className="weather-card">
                                            <Card.Body>
                                                <Card.Title>Temperature</Card.Title>
                                                <Card.Text>
                                                    {weatherData.temperature}°C
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="weather-card">
                                            <Card.Body>
                                                <Card.Title>Feels Like</Card.Title>
                                                <Card.Text>
                                                    {weatherData.feelsLike}°C
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="weather-card">
                                            <Card.Body>
                                                <Card.Title>Humidity</Card.Title>
                                                <Card.Text>
                                                    {weatherData.humidity}%
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <div style={{ marginBottom: '20px' }}></div> {/* Add space between temperature and precipitation */}
                                <Row>
                                    <Col>
                                        <Card className="weather-card">
                                            <Card.Body>
                                                <Card.Title>Precipitation</Card.Title>
                                                <Card.Text>
                                                    {weatherData.precipitation}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="weather-card">
                                            <Card.Body>
                                                <Card.Title>Wind Speed</Card.Title>
                                                <Card.Text>
                                                    {weatherData.windSpeed} km/h
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <div style={{ marginBottom: '20px' }}></div> {/* Add space between precipitation and weather condition */}
                                <Row>
                                    <Col>
                                        <Card className="weather-card">
                                            <Card.Body>
                                                <Card.Title>Weather Condition</Card.Title>
                                                <Card.Text>
                                                    {weatherData.weatherDescription}
                                                </Card.Text>
                                                <img src={weatherData.weatherIcon} alt="Weather Icon" />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                        )}
                        {hourlyForecast && (
                            <Container className="mt-4">
                                {/* Display hourly forecast */}
                                <h3> Hourly Forecast</h3>
                                <Card className="weather-card">
                                    <Card.Body>
                                        <Slider {...settings}>
                                            {hourlyForecast.map((hourlyData, index) => (
                                                <div key={index} className="hourly-forecast-item">
                                                    <p>{formatHour(hourlyData.dt_txt)}: {hourlyData.main.temp}°C</p>
                                                    <p>{hourlyData.weather[0].description}</p>
                                                    <img src={`https://openweathermap.org/img/wn/${hourlyData.weather[0].icon}.png`} alt="Weather Icon" />
                                                </div>
                                            ))}
                                        </Slider>
                                    </Card.Body>
                                </Card>
                            </Container>
                        )}
                        {dailyForecast && (
                            <Container className="mt-4">
                                {/* Display daily forecast */}
                                <h3>Daily Forecast</h3>
                                {dailyForecast.map((dailyData, index) => (
                                    <Card key={index} className="mt-3 weather-card">
                                        <Card.Body>
                                            <Card.Title>{formatDay(dailyData.dt_txt)}</Card.Title>
                                            <Card.Text>
                                                <p>Temperature: {dailyData.main.temp}°C</p>
                                                <p>{dailyData.weather[0].description}</p>
                                                <img src={`https://openweathermap.org/img/wn/${dailyData.weather[0].icon}.png`} alt="Weather Icon" />
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Container>
                        )}
                    </Container>
                )}
            </div>
            <Footer style={{ marginTop: '50px' }} />
        </>
    );
}


