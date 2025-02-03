package config

import (
	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
)

type Config struct {
	DATABASE_URL          string `envconfig:"DATABASE_URL"`
	BALL_DONT_LIE_API_KEY string `envconfig:"BALL_DONT_LIE_API_KEY"`
}

func loadConfig() (*Config, error) {
	godotenv.Load()
	var cfg Config

	err := envconfig.Process("", &cfg)
	if err != nil {
		return nil, err
	}

	return &cfg, nil
}

func MustLoadConfig() *Config {
	cfg, err := loadConfig()
	if err != nil {
		panic(err)
	}

	return cfg
}
