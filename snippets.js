const SNIPPETS = {
    "java": [
        { label: "HashMap", code: "Map<KeyType, ValueType> map = new HashMap<>();", desc: "Create a new HashMap" },
        { label: "HashSet", code: "Set<Type> set = new HashSet<>();", desc: "Create a new HashSet" },
        { label: "ArrayList", code: "List<Type> list = new ArrayList<>();", desc: "Create a new ArrayList" },
        { label: "Queue (LinkedList)", code: "Queue<Type> queue = new LinkedList<>();", desc: "Create a Queue using LinkedList" },
        { label: "PriorityQueue (Min, Default)", code: "PriorityQueue<Type> pq = new PriorityQueue<>();", desc: "Create a Min Heap" },
        { label: "PriorityQueue (Max)", code: "PriorityQueue<Type> pq = new PriorityQueue<>(Collections.reverseOrder());", desc: "Create a Max Heap" },
        { label: "Stack", code: "Stack<Type> stack = new Stack<>();", desc: "Create a Stack" },
        { label: "Array Sort", code: "Arrays.sort(arr);", desc: "Sort an array" },
        { label: "Collection Sort", code: "Collections.sort(list);", desc: "Sort a list" },
        { label: "For Loop", code: "for (int i = 0; i < n; i++) {\n    \n}", desc: "Standard for loop" },
        { label: "Enhanced For Loop", code: "for (Type item : collection) {\n    \n}", desc: "ForEach loop" },
        { label: "Map Iteration", code: "for (Map.Entry<K, V> entry : map.entrySet()) {\n    K key = entry.getKey();\n    V val = entry.getValue();\n}", desc: "Iterate over map entries" }
    ],
    "cpp": [
        { label: "Vector", code: "vector<Type> v;", desc: "Create a vector" },
        { label: "Unordered Map", code: "unordered_map<KeyType, ValueType> mp;", desc: "Create a hash map" },
        { label: "Unordered Set", code: "unordered_set<Type> s;", desc: "Create a hash set" },
        { label: "Map (Sorted)", code: "map<KeyType, ValueType> mp;", desc: "Create a sorted map (RB Tree)" },
        { label: "Set (Sorted)", code: "set<Type> s;", desc: "Create a sorted set" },
        { label: "Priority Queue (Max, Default)", code: "priority_queue<Type> pq;", desc: "Create a Max Heap" },
        { label: "Priority Queue (Min)", code: "priority_queue<Type, vector<Type>, greater<Type>> pq;", desc: "Create a Min Heap" },
        { label: "Stack", code: "stack<Type> st;", desc: "Create a stack" },
        { label: "Queue", code: "queue<Type> q;", desc: "Create a queue" },
        { label: "Sort", code: "sort(v.begin(), v.end());", desc: "Sort a vector" },
        { label: "Custom Sort (Lambda)", code: "sort(v.begin(), v.end(), [](const Type& a, const Type& b) {\n    return a < b;\n});", desc: "Sort with lambda" },
        { label: "For Loop", code: "for (int i = 0; i < n; ++i) {\n    \n}", desc: "Standard for loop" },
        { label: "Range-based For Loop", code: "for (const auto& item : container) {\n    \n}", desc: "Iterate over container" }
    ]
};

// Make it available globally for content.js
window.LEETCODE_CMDK_SNIPPETS = SNIPPETS;
