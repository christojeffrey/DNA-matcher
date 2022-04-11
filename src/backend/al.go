package main

import (
	"fmt"
)

func max(a, b int) int {
	if a < b {
		return b
	}
	return a
}

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

func algo(text string, pattern string) []int {
	out := make([]int, 0)
	last := buildLast(pattern)
	dna_chain := text
	fmt.Println("DNA Chain = ", dna_chain)
	fmt.Println("Pattern = ", pattern)
	text_len := len(dna_chain)
	pattern_len := len(pattern)

	shift := 0
	for shift <= (text_len - pattern_len) {
		j := pattern_len - 1
		for j >= 0 && pattern[j] == text[shift+j] {
			j--
		}
		if j < 0 {
			fmt.Println("Pattern found at", shift)
			out = append(out, shift)
			if shift+pattern_len < text_len {
				shift = shift + pattern_len - last[text[shift+pattern_len]]
			} else {
				shift++
			}
		} else {
			shift = shift + max(1, j-last[text[shift+j]])
		}
	}
	return out
}
func main() {
	text := "AABAACAADAABAABA"
	pattern := "AABA"
	out := algo(text, pattern)
	fmt.Println("Pattern found", len(out), "times")
}
