package logging

import (
	"log"
	"os"
)

// Logger is a simple logger that writes messages to the standard output
type Logger struct {
	*log.Logger
}

// NewLogger creates a new logger
func NewLogger() *Logger {
	return &Logger{log.New(os.Stdout, "", log.LstdFlags)}
}

// Log logs a message
func (l *Logger) Log(message string) {
	l.Printf("%s", message)
}
