package main

import (
	"fmt"
)

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

func KMPAlgo(text string, pattern string) []int {
	out := make([]int, 0)
	failure := computeFailure(pattern)
	fmt.Println("Text: ", text)
	fmt.Println("Pattern: ", pattern)
	i := 0
	j := 0
	for i < len(text) {
		if pattern[j] == text[i] {
			j++
			i++
			if j == len(pattern) {
				fmt.Println("Pattern found at", i-j)
				out = append(out, i-j)
				j = failure[j-1]

			}
		} else if (i < len(text)) && (pattern[j] != text[i]) {
			if j != 0 {
				j = failure[j-1]
			} else {
				i++
			}
		}
	}
	return out
}
