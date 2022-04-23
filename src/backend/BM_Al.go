package main

// Boyer-Moore algorithm implementation
import (
	"fmt"
)

func max(a, b int) int {
	if a < b {
		return b
	}
	return a
}

//Builds the last occurence array for the pattern
func buildLast(pattern string) [128]int {
	last := [128]int{}
	for i := 0; i < 128; i++ {
		last[i] = -1
	}
	for i := 0; i < len(pattern); i++ {
		last[pattern[i]] = i
	}
	return last
}

// Base algorithm to be used
func BMAlgo(text string, pattern string) ([]int, int) {
	// Initializes output array and last occurence array
	out := make([]int, 0)
	last := buildLast(pattern)

	text_len := len(text)
	pattern_len := len(pattern)
	shift := 0
	max_sim := 0

	for shift <= (text_len - pattern_len) {
		j := pattern_len - 1
		// searches pattern backwards, decrement j
		// until either j < 0 or the characters aren't equal
		for j >= 0 && pattern[j] == text[shift+j] {
			j--
		}

		// if j less than 0 (pattern found), then
		// update maximum similarity value to pattern length (found)
		// and change shift value
		if j < 0 {
			fmt.Println("Pattern found at", shift)
			out = append(out, shift)
			max_sim = pattern_len

			if shift+pattern_len < text_len {
				shift = shift + pattern_len - last[text[shift+pattern_len]]
			} else {
				shift++
			}
			// if not found, update maximum similarity value
			// and change shift value
		} else {
			if pattern_len-j > max_sim {
				max_sim = j
			}
			shift = shift + max(1, j-last[text[shift+j]])
		}
	}
	return out, max_sim
}
