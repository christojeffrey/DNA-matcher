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

func countSimilarities(text string, pattern string) int {
	count := 0
	for i := 0; i < len(text)-len(pattern)+1; i++ {
		temp := 0
		for j := 0; j < len(pattern); j++ {
			if text[i+j] == pattern[j] {
				temp++
			}
		}
		if temp > count {
			count = temp
		}
	}
	return count
}

func LCS(text string, pattern string, text_len int, pattern_len int) int {
	if text_len == 0 || pattern_len == 0 {
		return 0
	}
	if text[text_len-1] == pattern[pattern_len-1] {
		return 1 + LCS(text, pattern, text_len-1, pattern_len-1)
	} else {
		return max(LCS(text, pattern, text_len-1, pattern_len), LCS(text, pattern, text_len, pattern_len-1))
	}
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

func BMAlgo(text string, pattern string) []int {
	out := make([]int, 0)
	last := buildLast(pattern)
	fmt.Println("Text: ", text)
	fmt.Println("Pattern: ", pattern)
	text_len := len(text)
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
