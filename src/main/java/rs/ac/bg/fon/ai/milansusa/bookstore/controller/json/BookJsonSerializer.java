package rs.ac.bg.fon.ai.milansusa.bookstore.controller.json;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import rs.ac.bg.fon.ai.milansusa.bookstore.dao.Result;
import rs.ac.bg.fon.ai.milansusa.bookstore.model.Book;

public class BookJsonSerializer {

	public static String serializeBooks(Result<Book> allBooks) {
		JsonObject result = new JsonObject();
		JsonObject pagination = new JsonObject();
		pagination.addProperty("maxResults",
				String.valueOf(allBooks.getMaxResults()));
		result.add("pagination", pagination);
		JsonArray booksArray = new JsonArray();
		for (Book book : allBooks.getData()) {
			JsonObject bookJson = new JsonObject();
			bookJson.addProperty("id", String.valueOf(book.getId()));
			bookJson.addProperty("title", book.getTitle());
			bookJson.addProperty("releaseYear",
					String.valueOf(book.getReleaseYear()));
			booksArray.add(bookJson);
		}
		result.add("data", booksArray);
		return result.toString();
	}

}
