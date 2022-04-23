package main

// KMP algorithm implementation
import (
	"fmt"
)

// calculate mismatch position array
func computeFailure(pattern string) []int {
	failure := make([]int, len(pattern))
	failure[0] = 0
	i := 1
	j := 0
	for i < len(pattern) {
		if pattern[i] == pattern[j] {
			j++
			failure[i] = j
			i++
		} else {
			if j > 0 {
				j = failure[j-1]
			} else {
				failure[i] = 0
				i++
			}
		}
	}
	return failure
}

// base algorithm to be used
func KMPAlgo(text string, pattern string) ([]int, int) {
	out := make([]int, 0)
	failure := computeFailure(pattern)
	max_sim := 0

	i := 0
	j := 0
	for i < len(text) {
		// works similar to the brute-force algorithm,
		// finds until pattern matches
		if pattern[j] == text[i] {
			j++
			i++
			if j == len(pattern) {
				fmt.Println("Pattern found at", i-j)
				out = append(out, i-j)
				max_sim = len(pattern)
				fmt.Println(max_sim)
				j = failure[j-1]

			}
			// if found a condition where the characters don't match,
			// update j value to the value of the mismatch position
		} else if (i < len(text)) && (pattern[j] != text[i]) {
			if j != 0 {
				if j > max_sim {
					max_sim = j
					fmt.Println((max_sim))
				}
				j = failure[j-1]
			} else {
				i++
			}
		}
	}
	return out, max_sim
}
