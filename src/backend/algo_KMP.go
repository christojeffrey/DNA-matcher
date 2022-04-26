package main

// KMP algorithm implementation

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
func KMPAlgo(text string, pattern string) (int) {
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
				max_sim = len(pattern)
				break
			}
			// if found a condition where the characters don't match,
			// update j value to the value of the mismatch position
		} else if (i < len(text)) && (pattern[j] != text[i]) {
			if j != 0 {
				if j > max_sim {
					max_sim = j
				}
				j = failure[j-1]
			} else {
				i++
			}
		}
	}
	return max_sim
}
