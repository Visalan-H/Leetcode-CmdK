const SNIPPETS = {
    "java": [
        // --- Data Structures ---
        { label: "HashMap", code: "Map<${1:Key}, ${2:Value}> map = new HashMap<>();", desc: "Key-Value pairs" },
        { label: "HashSet", code: "Set<${1:Type}> set = new HashSet<>();", desc: "Unique elements" },
        { label: "TreeMap", code: "Map<${1:Key}, ${2:Value}> map = new TreeMap<>();", desc: "Sorted Key-Value pairs" },
        { label: "TreeSet", code: "Set<${1:Type}> set = new TreeSet<>();", desc: "Sorted unique elements" },
        { label: "ArrayList", code: "List<${1:Type}> list = new ArrayList<>();", desc: "Dynamic array" },
        { label: "LinkedList", code: "List<${1:Type}> list = new LinkedList<>();", desc: "Doubly linked list" },
        { label: "Stack", code: "Stack<${1:Type}> stack = new Stack<>();", desc: "LIFO structure" },
        { label: "Queue (LinkedList)", code: "Queue<${1:Type}> queue = new LinkedList<>();", desc: "FIFO structure" },
        { label: "Deque (ArrayDeque)", code: "Deque<${1:Type}> deque = new ArrayDeque<>();", desc: "Double-ended queue (faster than Stack)" },
        { label: "PriorityQueue (Min)", code: "PriorityQueue<${1:Type}> pq = new PriorityQueue<>();", desc: "Min Heap" },
        { label: "PriorityQueue (Max)", code: "PriorityQueue<${1:Type}> pq = new PriorityQueue<>(Collections.reverseOrder());", desc: "Max Heap" },
        { label: "PriorityQueue (Custom)", code: "PriorityQueue<${1:Type}> pq = new PriorityQueue<>((a, b) -> ${2:a - b});", desc: "Heap with custom comparator" },
        
        // --- Arrays & Integers ---
        { label: "2D Array", code: "int[][] dp = new int[${1:rows}][${2:cols}];", desc: "Initialize matrix" },
        { label: "Fill Array", code: "Arrays.fill(${1:arr}, ${2:-1});", desc: "Fill array with value" },
        { label: "Sort Array", code: "Arrays.sort(${1:arr});", desc: "Sort primitive array" },
        { label: "Sort List", code: "Collections.sort(${1:list});", desc: "Sort collection" },
        { label: "Sort Custom", code: "Collections.sort(${1:list}, (a, b) -> ${2:a - b});", desc: "Sort with lambda" },
        
        // --- Strings ---
        { label: "StringBuilder", code: "StringBuilder sb = new StringBuilder();", desc: "Mutable string" },
        { label: "String to Int", code: "int n = Integer.parseInt(${1:str});", desc: "Parse string to int" },
        { label: "Int to String", code: "String s = String.valueOf(${1:num});", desc: "Convert int to string" },
        { label: "Char to Int", code: "int n = Character.getNumericValue(${1:ch});", desc: "Convert char to numeric value" },
        { label: "String to Char Array", code: "char[] chars = ${1:str}.toCharArray();", desc: "Convert string to char array" },
        
        // --- Loops & Logic ---
        { label: "For Loop", code: "for (int i = 0; i < ${1:n}; i++) {\n    ${2}\n}", desc: "Standard loop" },
        { label: "Enhanced For", code: "for (${1:Type} ${2:item} : ${3:collection}) {\n    ${4}\n}", desc: "ForEach loop" },
        { label: "Map Iteration", code: "for (Map.Entry<${1:K}, ${2:V}> entry : ${3:map}.entrySet()) {\n    ${1} key = entry.getKey();\n    ${2} val = entry.getValue();\n}", desc: "Iterate map entries" },
        { label: "Binary Search", code: "int idx = Collections.binarySearch(${1:list}, ${2:target});", desc: "Returns index or -(insertion point) - 1" },
        
        // --- Conversion ---
        { label: "Array to List", code: "List<${1:Type}> list = new ArrayList<>(Arrays.asList(${2:arr}));", desc: "Convert Array to List" },
        { label: "List to Array", code: "int[] arr = ${1:list}.stream().mapToInt(i -> i).toArray();", desc: "List<Integer> to int[]" }
    ],
    "cpp": [
        // --- Data Structures ---
        { label: "Vector", code: "vector<${1:int}> v;", desc: "Dynamic array" },
        { label: "2D Vector", code: "vector<vector<${1:int}>> dp(${2:rows}, vector<${1:int}>(${3:cols}, ${4:0}));", desc: "Matrix with default value" },
        { label: "Unordered Map", code: "unordered_map<${1:Key}, ${2:Val}> mp;", desc: "Hash Map (O(1))" },
        { label: "Map (Sorted)", code: "map<${1:Key}, ${2:Val}> mp;", desc: "RB Tree Map (O(log n))" },
        { label: "Unordered Set", code: "unordered_set<${1:Type}> s;", desc: "Hash Set" },
        { label: "Set (Sorted)", code: "set<${1:Type}> s;", desc: "Sorted Set" },
        { label: "Multiset", code: "multiset<${1:Type}> ms;", desc: "Sorted set allowing duplicates" },
        { label: "Stack", code: "stack<${1:Type}> st;", desc: "LIFO" },
        { label: "Queue", code: "queue<${1:Type}> q;", desc: "FIFO" },
        { label: "Deque", code: "deque<${1:Type}> dq;", desc: "Double-ended queue" },
        { label: "Priority Queue (Max)", code: "priority_queue<${1:Type}> pq;", desc: "Max Heap" },
        { label: "Priority Queue (Min)", code: "priority_queue<${1:Type}, vector<${1:Type}>, greater<${1:Type}>> pq;", desc: "Min Heap" },
        { label: "Bitset", code: "bitset<${1:32}> bs;", desc: "Static bit array" },
        
        // --- Algorithms ---
        { label: "Sort", code: "sort(${1:v}.begin(), ${1:v}.end());", desc: "IntroSort (O(n log n))" },
        { label: "Sort Descending", code: "sort(${1:v}.rbegin(), ${1:v}.rend());", desc: "Sort strict reverse" },
        { label: "Custom Sort", code: "sort(${1:v}.begin(), ${1:v}.end(), [](const ${2:Type}& a, const ${2:Type}& b) {\n    return a < b;\n});", desc: "Sort with lambda" },
        { label: "Reverse", code: "reverse(${1:v}.begin(), ${1:v}.end());", desc: "Reverse range" },
        { label: "Max Element", code: "auto it = max_element(${1:v}.begin(), ${1:v}.end());\nint maxVal = *it;", desc: "Find max element" },
        { label: "Min Element", code: "auto it = min_element(${1:v}.begin(), ${1:v}.end());\nint minVal = *it;", desc: "Find min element" },
        { label: "Accumulate", code: "int sum = accumulate(${1:v}.begin(), ${1:v}.end(), 0);", desc: "Sum of elements" },
        { label: "Fill (Memset)", code: "memset(${1:arr}, ${2:-1}, sizeof(${1:arr}));", desc: "Fill C-style array (0 or -1)" },
        
        // --- Binary Search ---
        { label: "Lower Bound", code: "auto it = lower_bound(${1:v}.begin(), ${1:v}.end(), ${2:target});", desc: "First element >= target" },
        { label: "Upper Bound", code: "auto it = upper_bound(${1:v}.begin(), ${1:v}.end(), ${2:target});", desc: "First element > target" },
        
        // --- Strings & Type ---
        { label: "String to Int", code: "int n = stoi(${1:str});", desc: "String to integer" },
        { label: "Int to String", code: "string s = to_string(${1:num});", desc: "Integer to string" },
        { label: "Char to Int", code: "int val = ${1:ch} - '0';", desc: "Char digit to int" },
        
        // --- Loops ---
        { label: "For Loop", code: "for (int i = 0; i < ${1:n}; ++i) {\n    ${2}\n}", desc: "0 to n-1" },
        { label: "Range For", code: "for (auto& ${1:x} : ${2:v}) {\n    ${3}\n}", desc: "Iterate by reference" },
        { label: "Iterator Loop", code: "for (auto it = ${1:mp}.begin(); it != ${1:mp}.end(); ++it) {\n    ${2}\n}", desc: "Iterator based loop" }
    ]
};

// Make it available globally for content.js
window.LEETCODE_CMDK_SNIPPETS = SNIPPETS;
