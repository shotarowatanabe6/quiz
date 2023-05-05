package logging

import (
	"fmt"
	"io"
	"os"
	"time"
)

// Logger is a struct for logging messages
type Logger struct {
	output io.Writer
}

// NewLogger creates a new Logger instance with the given output writer
func NewLogger(output io.Writer) *Logger {
	return &Logger{output}
}

// Log prints a log message to the output writer
func (l *Logger) Log(level string, message string) {
	timestamp := time.Now().Format("2006-01-02 15:04:05")
	fmt.Fprintf(l.output, "[%s] [%s] %s\n", timestamp, level, message)
}

// Debug prints a debug log message to the output writer
func (l *Logger) Debug(message string) {
	l.Log("DEBUG", message)
}

// Info prints an info log message to the output writer
func (l *Logger) Info(message string) {
	l.Log("INFO", message)
}

// Error prints an error log message to the output writer
func (l *Logger) Error(message string) {
	l.Log("ERROR", message)
}

// NewDefaultLogger creates a new Logger instance with stdout as the output writer
func NewDefaultLogger() *Logger {
	return NewLogger(os.Stdout)
}
