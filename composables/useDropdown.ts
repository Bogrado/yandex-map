export const useDropdown = () => {
    const dropdownTarget = ref(null)
    const isOpen = ref(false)

    const openDropdown = () => {
        isOpen.value = true
    }

    const closeDropdown = () => {
        isOpen.value = false
    }

    const toggleDropdown = () => {
        isOpen.value = !isOpen.value
    }

    return {
        isOpen,
        dropdownTarget,
        openDropdown,
        closeDropdown,
        toggleDropdown
    }
}
