package main

// Boyer-Moore algorithm implementation

func max(a, b int) int {
	if a < b {
		return b
	}
	return a
}

//Builds the last occurence array for the patter
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

func min(a, b int) int {
	if a > b {
		return b
	}
	return a
}

func BMAlgo(text string, pattern string) int {
	// Initializes output array and last occurence array

	last := buildLast(pattern)
	text_len := len(text)
	pattern_len := len(pattern)
	max_sim := 0

	i := pattern_len - 1

	if i > text_len-1 {
		return max_sim
	}

	j := pattern_len - 1

	for {
		// keeps searching for pattern
		if pattern[j] == text[i] {
			if j == 0 {
				return pattern_len
			} else {
				i--
				j--
			}
		} else {
			lastOcc := last[text[i]]
			i = i + pattern_len - min(j, 1+lastOcc)
			if (pattern_len - j) > max_sim {
				max_sim = j
			}

			j = pattern_len - 1

		}
		if i > text_len-1 {
			break
		}
	}
	return max_sim
}
