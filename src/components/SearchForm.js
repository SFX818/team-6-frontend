import React from 'react'


export const SearchForm = () => {
    return (
        <div>
            <form>
                <input placeholder="enter by city/state/country">
                </input>
                <button class="btn waves-effect waves-light" type="submit" name="action">
                    <i class="material-icons right">search</i>
                </button>
            </form>
        </div>
    )
}

export default SearchForm